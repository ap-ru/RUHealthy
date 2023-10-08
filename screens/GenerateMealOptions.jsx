import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function MealForm ({navigation}) {

    const [calL, setcalL] = useState(null);
    const [calH, setcalH] = useState(null);
    const [proteinL, setproteinL] = useState(null);
    const [proteinH, setproteinH] = useState(null);
    const [carbsL, setcarbsL] = useState(null);
    const [carbsH, setcarbsH] = useState(null);
    const [fatL, setfatL] = useState(null);
    const [fatH, setfatH] = useState(null);

    const [errorCheckEnabled, setErrorCheckEnabled] = useState(false);

    const [isCheckedE, setIsCheckedE] = useState(true);
    const [isCheckedS, setIsCheckedS] = useState(true);
    const [isCheckedD, setIsCheckedD] = useState(true);

    const [openD, setOpenD] = useState(false);
    const [valueD, setValueD] = useState(null);
    const [itemsD, setItemsD] = useState([
        {label: 'Busch', value: 'BUSCH'},
        {label: 'Livingston', value: 'LIVI'},
        {label: 'Neilson', value: 'CD'},
        {label: 'The Atrium', value: 'CA'},
    ]);

    const [openM, setOpenM] = useState(false);
    const [valueM, setValueM] = useState(null);
    const [itemsM, setItemsM] = useState([
        {label: 'Breakfast', value: 'Breakfast'},
        {label: 'Lunch', value: 'Lunch'},
        {label: 'Dinner', value: 'Dinner'},
    ]);

    DropDownPicker.setListMode("FLATLIST");

    const EntreeCheckBox = () => {
      
        const toggleCheckBox = () => {
          setIsCheckedE(!isCheckedE);
        };
      
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={toggleCheckBox} style={styles.checkBox}>
              {isCheckedE ? (
                <Text style={{color: '#CC0033'}}>✓</Text>
              ) : (
                <Text style={styles.uncheckedText}></Text>
              )}
            </TouchableOpacity>
          </View>
        );
    }

    const SideCheckBox = () => {
      
        const toggleCheckBox = () => {
          setIsCheckedS(!isCheckedS);
        };
      
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={toggleCheckBox} style={styles.checkBox}>
              {isCheckedS ? (
                <Text style={{color: '#CC0033'}}>✓</Text>
              ) : (
                <Text style={styles.uncheckedText}></Text>
              )}
            </TouchableOpacity>
          </View>
        );
    }

    const DessertCheckBox = () => {
      
        const toggleCheckBox = () => {
          setIsCheckedD(!isCheckedD);
        };
      
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={toggleCheckBox} style={styles.checkBox}>
              {isCheckedD ? (
                <Text style={{color: '#CC0033'}}>✓</Text>
              ) : (
                <Text style={styles.uncheckedText}></Text>
              )}
            </TouchableOpacity>
          </View>
        );
    }

    const createJSON = (valueD, valueM, calL, calH, proteinL, proteinH, fatL, fatH, carbsL, carbsH, isCheckedE, isCheckedS, isCheckedD) => {
        const data = {
            "dining_hall": valueD,
            "meal": valueM,
            "entree": isCheckedE,
            "side": isCheckedS,
            "dessert": isCheckedD
        };
        if (calL !== null && calH !== null){
            data["total_calories"]={
                low: parseInt(calL),
                high: parseInt(calH)
            }
        };
        if (fatL !== null && fatH !== null){
            data["total_fat"]={
                low: parseInt(fatL),
                high: parseInt(fatH)
            }
        };
        if (carbsL !== null && carbsH !== null){
            data["total_carbs"]={
                low: parseInt(carbsL),
                high: parseInt(carbsH)
            }
        };
        if (proteinL !== null && proteinH !== null){
            data["protein"]={
                low: parseInt(proteinL),
                high: parseInt(proteinH)
            }
        };
        return data
    }

    const checkFields = (valueD, valueM, calL, calH, proteinL, proteinH, fatL, fatH, carbsL, carbsH, isCheckedE, isCheckedS, isCheckedD) => {
        if (errorCheckEnabled) {
            if (valueD === null) {
                throw new Error("No Location Selected");
            }
            if (valueM === null) {
                throw new Error("No Meal Time Selected");
            }
            if ((calL === null && calH !== null) || (calL !== null && calH === null)) {
                throw new Error("Calorie Field Must Be Complete or Empty");
            }
            if (proteinL === null && proteinH !== null || proteinL !== null && proteinH === null) {
                throw new Error("Protein Field Must Be Complete or Empty");
            }
            if (fatL === null && fatH !== null || fatL !== null && fatH === null) {
                throw new Error("Fat Field Must Be Complete or Empty");
            }
            if (carbsL === null && carbsH !== null || carbsL !== null && carbsH === null) {
                throw new Error("Carbs Field Must Be Complete or Empty");
            }
            if (isCheckedE === false && isCheckedS === false && isCheckedS === false) {
                throw new Error("Must Select One Meal Type");
            }
        }
        
        return createJSON(
            valueD, valueM, calL, calH, proteinL, proteinH, fatL,
            fatH, carbsL, carbsH, isCheckedE, isCheckedS, isCheckedD
            );
    }
    
    const buttonOnPress = () => {
        setErrorCheckEnabled(true)
        let payload = checkFields(
            valueD, valueM, calL, calH, proteinL, proteinH, fatL,
            fatH, carbsL, carbsH, isCheckedE, isCheckedS, isCheckedD
            )
        fetch('http://192.168.1.158:8000/meals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(response => response.json())
            .then(json => {
                console.log(JSON.stringify(json))
                navigation.navigate('MealDisplay', {mealList: json})
             }).catch(error => {
                console.error(error)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Create Your Meal</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.location}>
                    <Text style={styles.formText}>Select Location: </Text>
                    <View style={styles.dropDownContainer}> 
                        <DropDownPicker
                            placeholder="Select Location"
                            placeholderStyle={{
                                color: "#5F6A72"
                            }}
                            open={openD}
                            value={valueD}
                            items={itemsD}
                            setOpen={setOpenD}
                            setValue={setValueD}
                            setItems={setItemsD}
                            style={styles.locationDropDown}
                            dropDownDirection="BOTTOM"
                            zIndex={1000}
                            dropDownContainerStyle={{
                                backgroundColor: '#D9D9D9',
                                borderColor: '#5F6A72',
                            }}
                        />
                    </View>
                </View>
                <View style={styles.time}>
                    <Text style={styles.formText}>Select Time: </Text>
                    <View style={styles.dropDownContainer}> 
                        <DropDownPicker
                            placeholder="Select Time"
                            placeholderStyle={{
                                color: "#5F6A72"
                            }}
                            open={openM}
                            value={valueM}
                            items={itemsM}
                            setOpen={setOpenM}
                            setValue={setValueM}
                            setItems={setItemsM}
                            style={styles.locationDropDown}
                            dropDownDirection="BOTTOM"
                            zIndex={openM ? 1000 : 0}
                            dropDownContainerStyle={{
                                backgroundColor: '#D9D9D9',
                                borderColor: '#5F6A72',
                            }}
                        />
                    </View>
                </View>
                <View style={styles.range}>
                    <Text style={styles.formText}>Desired Calories: </Text>
                    <View style={styles.rangeContainer}>
                        <TextInput 
                            style={styles.formInput}
                            placeholder="Low"
                            textAlign="center"
                            placeholderTextColor={'#5F6A72'}
                            inputMode="numeric"
                            returnKeyType="done"
                            onChangeText={(text) => setcalL(text)}
                        ></TextInput>
                        <Text style={styles.formText}> to </Text>
                        <TextInput 
                            style={styles.formInput}
                            placeholder="High"
                            textAlign="center"
                            placeholderTextColor={'#5F6A72'}
                            inputMode="numeric"
                            returnKeyType="done"
                            onChangeText={(text) => setcalH(text)}
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.range}>
                    <Text style={styles.formText}>Desired Protein: </Text>
                    <View style={styles.rangeContainer}>
                        <TextInput 
                            style={styles.formInput}
                            placeholder="Low"
                            placeholderTextColor={'#5F6A72'}
                            inputMode="numeric"
                            textAlign="center"
                            returnKeyType="done"
                            onChangeText={(text) => setproteinL(text)}
                        ></TextInput>
                        <Text style={styles.formText}> to </Text>
                        <TextInput 
                            style={styles.formInput}
                            placeholder="High"
                            placeholderTextColor={'#5F6A72'}
                            inputMode="numeric"
                            textAlign="center"
                            returnKeyType="done"
                            onChangeText={(text) => setproteinH(text)}
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.range}>
                    <Text style={styles.formText}>Desired Carbs: </Text>
                    <View style={styles.rangeContainer}>
                        <TextInput 
                            style={styles.formInput}
                            placeholder="Low"
                            placeholderTextColor={'#5F6A72'}
                            inputMode="numeric"
                            textAlign="center"
                            returnKeyType="done"
                            onChangeText={(text) => setcarbsL(text)}
                        ></TextInput>
                        <Text style={styles.formText}> to </Text>
                        <TextInput 
                            style={styles.formInput}
                            placeholder="High"
                            placeholderTextColor={'#5F6A72'}
                            inputMode="numeric"
                            textAlign="center"
                            returnKeyType="done"
                            onChangeText={(text) => setcarbsH(text)}
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.range}>
                    <Text style={styles.formText}>Desired Fats: </Text>
                    <View style={styles.rangeContainer}>
                        <TextInput 
                            style={styles.formInput}
                            placeholder="Low"
                            placeholderTextColor={'#5F6A72'}
                            inputMode="numeric"
                            textAlign="center"
                            returnKeyType="done"
                            onChangeText={(text) => setfatL(text)}
                        ></TextInput>
                        <Text style={styles.formText}> to </Text>
                        <TextInput 
                            style={styles.formInput}
                            placeholder="High"
                            placeholderTextColor={'#5F6A72'}
                            inputMode="numeric"
                            textAlign="center"
                            returnKeyType="done"
                            onChangeText={(text) => setfatH(text)}
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.selectBoxes}>
                    <Text style={styles.formText}>Entree: </Text>
                    <EntreeCheckBox></EntreeCheckBox>
                    <Text style={styles.formText}>Side: </Text>
                    <SideCheckBox></SideCheckBox>
                    <Text style={styles.formText}>Dessert: </Text>
                    <DessertCheckBox></DessertCheckBox>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={buttonOnPress}>
                    <Text style={styles.buttonText}>Generate Meal</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    titleContainer: {
        flex: 2,
        backgroundColor: '#CC0033',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
    },
    formContainer: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    formText: {
        color: '#CC0033',
        fontSize: 20,
    },
    formInput: {
        backgroundColor: '#D9D9D9',
        width: '40%',
        borderRadius: 8,
        height: 45,
        zIndex: 0,
    },
    location: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        zIndex: 1000,
    },
    locationDropDown: {
        borderColor: '#D9D9D9',
        backgroundColor: '#D9D9D9',
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        zIndex: 100,
    },
    dropDownContainer: {
        alignSelf: 'flex-end',
        width: '51%',
    },
    range: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    rangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '51%',
    },
    selectBoxes: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginLeft: 10,
    },
    checkBox: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    button: {
        backgroundColor: '#CC0033',
        width: '60%',
        height: 50,
        alignSelf: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
    }
});