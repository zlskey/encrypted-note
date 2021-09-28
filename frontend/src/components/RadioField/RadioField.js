import { IconCheck } from '@tabler/icons'

import {
    InputField,
    Input,
    Label,
    Checkbox,
    Content,
} from './RadioField.styles'

const RadioField = ({ name, text, isChecked, setIsChecked }) => {
    return (
        <InputField className='clickable'>
            <Input
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                type='checkbox'
                id={name}
            />

            <Label htmlFor={name}>
                <Checkbox>{isChecked && <IconCheck size='100%' />}</Checkbox>

                <Content>{text}</Content>
            </Label>
        </InputField>
    )
}

export default RadioField
