import Checkbox from "./Checkbox";


const CheckboxGroup = ({ options, selectedOption, setSelectedOption }) =>
{

    const handleOptionToggle = (option) =>
    {
        setSelectedOption(option === selectedOption ? null : option);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {
                options.map((option) => (
                    <div key={option} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                        <Checkbox
                            size={32}
                            checked={selectedOption === option}
                            toggleChecked={() => handleOptionToggle(option)}
                            checkColour='#000000'
                            checkBackgroundColour='#89f189'
                        />
                        <span style={{ color: '#000000', fontSize: 18, fontWeight: 500 }}>{option}</span>
                    </div>
                ))
            }
        </div>
    )
}
export default CheckboxGroup;
