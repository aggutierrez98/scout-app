import React from 'react'
import { Chip, List } from 'react-native-paper'

interface Props {
    id: string,
    text: string,
    list: {
        value: string;
        label: string;
    }[]
    handleChange: (arg: string) => void;
    selected: string[]
}

export const AccordionFilter = ({ id, text, list, handleChange, selected }: Props) => {
    return (
        <List.Accordion title={text} id={id}>
            {list.map(({ label, value }, index) => (
                <Chip
                    key={value + index}
                    onPress={() => handleChange(value)}
                    style={{ marginVertical: 10, marginHorizontal: 15 }}
                    selected={selected.includes(value)}
                    showSelectedCheck
                    showSelectedOverlay={true}
                    compact
                >
                    {label}
                </Chip>
            ))}
        </List.Accordion>
    )
}
