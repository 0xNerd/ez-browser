export type SqlValue = number | string | Uint8Array | null;
export type ParamsObject = Record<string, SqlValue>;
export type ParamsCallback = (obj: ParamsObject) => void;
export type BindParams = SqlValue[] | ParamsObject | null;

export interface QueryExecResult {
    columns: string[];
    values: SqlValue[][];
}

export interface StatementIteratorResult {
    done: boolean;
    value: Statement;
}

export declare class Statement {
    bind(values?: BindParams): boolean;
    free(): boolean;
    freemem(): void;
    get(params?: BindParams): SqlValue[];
    getAsObject(params?: BindParams): ParamsObject;
    getColumnNames(): string[];
    getNormalizedSQL(): string;
    getSQL(): string;
    reset(): void;
    run(values?: BindParams): void;
    step(): boolean;
}

export declare class StatementIterator implements Iterator<Statement>, Iterable<Statement> {
    [Symbol.iterator](): Iterator<Statement>;
    getRemainingSQL(): string;
    next(): StatementIteratorResult;
}

export declare class Database {
    constructor(data?: ArrayLike<number> | Buffer | null);
    close(): void;
    create_function(name: string, func: (...args: any[]) => any): Database;
    each(sql: string, params: BindParams, callback: ParamsCallback, done: () => void): Database;
    each(sql: string, callback: ParamsCallback, done: () => void): Database;
    exec(sql: string, params?: BindParams): QueryExecResult[];
    export(): Uint8Array;
    getRowsModified(): number;
    handleError(): null | never;
    iterateStatements(sql: string): StatementIterator;
    prepare(sql: string, params?: BindParams): Statement;
    run(sql: string, params?: BindParams): Database;
}
