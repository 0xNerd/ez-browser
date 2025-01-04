import { AgentRuntime, Character, ICacheManager, elizaLogger, stringToUuid, CacheManager, DbCacheAdapter, UUID, IDatabaseCacheAdapter, IDatabaseAdapter } from "@elizaos/core";
import { SqlJsDatabaseAdapter } from "../src/adapter-sqljs";
import initSqlJs from 'sql.js';

function initializeCache(
    db: IDatabaseCacheAdapter,
    agentId: UUID
): ICacheManager {
    return new CacheManager(new DbCacheAdapter(db, agentId));
}

async function initializeDatabase(): Promise<SqlJsDatabaseAdapter> {
    const SQL = await initSqlJs();
    const db = new SQL.Database();
    return new SqlJsDatabaseAdapter(db);
}

function getSecret(character: Character, secret: string): string {
    // First check character settings
    const characterSecret = character.settings?.secrets?.[secret];
    if (characterSecret !== undefined) {
        return characterSecret;
    }
    
    // Fallback to process.env
    return process.env[secret] || '';
}

export async function createBrowserAgent(
    character: Character,
    db: IDatabaseAdapter,
    cache: ICacheManager,
    token: string
): Promise<AgentRuntime> {
    elizaLogger.success(
        "Creating runtime for character",
        character.name
    );

    return new AgentRuntime({
      databaseAdapter: db,
      token,
      modelProvider: character.modelProvider,
      character,
      plugins: [],
      providers: [],
      actions: [],
      services: [],
      managers: [],
      cacheManager: cache,
      conversationLength: 32,
  });
}

export async function startBrowserAgent(
    character: Character,
    token: string,
): Promise<AgentRuntime> {
    try {
        character.id ??= stringToUuid(character.name);
        character.username ??= character.name;

        // Set embedding configuration
        if (!character.settings) {
            character.settings = {};
        }
        character.settings.embeddingModel = 'text-embedding-3-small';
        character.modelEndpointOverride = 'https://api.openai.com/v1';

        const db = await initializeDatabase();
        await db.init();

        const cache = initializeCache(db, character.id);
        const runtime = await createBrowserAgent(character, db, cache, token);
        await runtime.initialize();

        elizaLogger.debug(`Started ${character.name} as ${runtime.agentId}`);
        return runtime;
    } catch (error) {
        elizaLogger.error(`Error starting agent for character ${character.name}:`, error);
        throw error;
    }
}
