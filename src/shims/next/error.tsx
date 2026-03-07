export type ErrorProps = {
    statusCode: number;
};

export default function Error({ statusCode }: ErrorProps) {
    return <div>Erro: {statusCode}</div>;
}
