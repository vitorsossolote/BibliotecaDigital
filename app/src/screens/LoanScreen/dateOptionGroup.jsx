import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const DateOptionGroup = ({ onSelectDuration }) => {
    const [selectedDuration, setSelectedDuration] = useState(null);

    const handleSelect = (days) => {
        setSelectedDuration(days);
        onSelectDuration(days);
    };

    const durationOptions = [
        { days: 7, label: '7 dias' },
        { days: 14, label: '14 dias' }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione o prazo de entrega:</Text>
            <View style={styles.optionsContainer}>
                {durationOptions.map((option) => (
                    <Pressable 
                        key={option.days}
                        style={[
                            styles.optionButton, 
                            selectedDuration === option.days && styles.selectedButton
                        ]}
                        onPress={() => handleSelect(option.days)}
                    >
                        <Text 
                            style={[
                                styles.optionText, 
                                selectedDuration === option.days && styles.selectedText
                            ]}
                        >
                            {option.label}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#ee2d32', // Match the color scheme from the original code
    },
    optionText: {
        color: 'black',
    },
    selectedText: {
        color: 'white',
    },
});

export default DateOptionGroup;