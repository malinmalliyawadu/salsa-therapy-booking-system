interface Props {
    width?: number;
}

export const Skeleton: React.FC<Props> = ({ width = 40 }) => {
    return (
        <div
            className={`inline-block bg-gray-400 rounded-lg shadow-2xl animate-pulse w-${width} h-10`}
        ></div>
    );
};
