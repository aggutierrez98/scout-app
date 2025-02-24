import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';

type Item = {
    label: string;
    value: string;
}

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    list: Item[];
    dropDownStyle?: ViewStyle;
    dropDownItemSelectedStyle?: ViewStyle;
    dropDownItemSelectedTextStyle?: TextStyle;
    dropDownItemStyle?: ViewStyle;
    dropDownItemTextStyle?: TextStyle;
    dropDownContainerStyle?: ViewStyle;
}

const SearchDropdown = ({
    name,
    label,
    list,
}: Props) => {
    const { colors: {
        background,
        primaryContainer,
        secondaryContainer,
        onPrimary,
        surfaceVariant,
    }, roundness } = useTheme();

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            marginVertical: 8,
        },
        inputContainer: {
            position: 'relative',
            width: "100%",
        },
        input: {
            width: "100%",
            backgroundColor: background,
            color: onPrimary,
            borderRadius: roundness,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderColor: surfaceVariant,
            borderWidth: 1,
        },
        dropdownWrapper: {
            maxHeight: 300,
            width: "100%",
            alignSelf: 'center',
        },
        dropdownContainer: {
            borderRadius: 12,
            borderWidth: 1,
            width: '100%',
        },
        dropdownItem: {
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            backgroundColor: secondaryContainer,
            borderBottomColor: primaryContainer,
        },
        itemText: {
            color: onPrimary,
        },
    });


    const [text, setText] = useState('');
    const [filteredValues, setFilteredValues] = useState<Item[]>([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const inputRef = React.useRef<TextInput>(null);

    const { field, fieldState: { error } } = useController({ name });
    const handleDDChange = (value: string) => {
        field.onChange(value);
    };
    const hasError = Boolean(!!error);

    const handleChangeText = async (input: string) => {
        setText(input);

        if (input) {
            const matches = list.filter(({ label }) =>
                label.toLowerCase().includes(input.toLowerCase()),
            );
            const sortedMatches = matches.sort((a: any, b: any) => {
                if (a.label.toLowerCase() === input.toLowerCase()) return -1;
                if (b.label.toLowerCase() === input.toLowerCase()) return 1;
                return a.label.localeCompare(b.label);
            });

            setFilteredValues(sortedMatches);
            setOpenDropDown(true);
        } else {
            setOpenDropDown(false);
        }
    };

    const handleSelectValue = (selectedValue: Item) => {
        setText(selectedValue.label);
        handleDDChange(selectedValue.value);
        setFilteredValues([]);
        setOpenDropDown(false);
        inputRef.current?.clear();
    };

    useEffect(() => {
        if (text === '') {
            setOpenDropDown(false);
        }
    }, [text]);

    return (
        <View style={{ ...styles.container, marginVertical: 7, }}>
            <View style={styles.inputContainer}>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    onChangeText={handleChangeText}
                    placeholder={label}
                    placeholderTextColor={onPrimary}
                    value={text}
                />
            </View>
            {openDropDown && (
                <View style={styles.dropdownWrapper}>
                    <ScrollView
                        style={styles.dropdownContainer}
                        nestedScrollEnabled={true}>
                        {filteredValues.map((item: Item) => (
                            <TouchableOpacity
                                key={item.value}
                                onPress={() => handleSelectValue(item)}
                                style={styles.dropdownItem}>
                                <Text style={styles.itemText}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
            <HelperText type="error" visible={hasError}>
                {error?.message?.toString()}
            </HelperText>
        </View>
    );
};

export default SearchDropdown;


