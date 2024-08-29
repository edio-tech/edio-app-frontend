import { Check } from "lucide-react";


const Checkbox = ({ size, checked, toggleChecked, checkColour, checkBackgroundColour}) =>
{
    return (
        <button
            style={{
                height: size,
                aspectRatio: 1,
                borderWidth: 1,
                borderRadius: size/4,
                borderColor: checkColour,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: checked ? checkBackgroundColour : '#FFFFFF'
            }}
            onClick={toggleChecked}
        >
            {
                checked && <Check size={size-8} color={checkColour} />
            }
        </button>
    )
}
export default Checkbox;
