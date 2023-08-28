export interface CommonResponse<T> {
    status: 'success' | 'error';
    message: string;
    data: T;
}
