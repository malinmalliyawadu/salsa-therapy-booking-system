interface Props {
    name: string;
    label: string;
    type?: 'text' | 'textarea' | 'number' | 'weekday' | 'calendar';
    setValue: (val: string) => void;
    value?: string;
    placeholder?: string;
    error?: boolean;
}

const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export const FormElement: React.FC<Props> = ({
    name,
    label,
    type = 'text',
    setValue,
    value,
    placeholder,
    error,
}) => {
    return (
        <div className="mb-6">
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>
            {(type === 'text' || type === 'number') && (
                <input
                    type={type}
                    id={name}
                    className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                        error
                            ? 'border-red-900 border-2'
                            : 'border-gray-300 border'
                    }`}
                    required
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    placeholder={placeholder}
                />
            )}
            {type === 'textarea' && (
                <textarea
                    id={name}
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                ></textarea>
            )}
            {type === 'weekday' && (
                <>
                    <select
                        id={name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setValue(e.currentTarget.value)}
                        value={value}
                    >
                        {weekdays.map((x) => (
                            <option key={x} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>
                </>
            )}
            {type === 'calendar' && (
                <input
                    id={name}
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                />
            )}
        </div>
    );
};
