export interface ApiResult<T> {
    code: number;
    data: T;
    message: string;
    status: string;
    timestamp: string;
}
