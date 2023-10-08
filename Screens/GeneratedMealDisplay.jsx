import { StyleSheet, Text, View } from 'react-native';
import { FoodItem } from '../Models/FoodItem';
import { Meal } from '../Models/Meal';
import PagerView from 'react-native-pager-view';

const colors = ['#CC0033', '#B8002E', '#A30029', '#8F0024']

export function FoodItemCard (bgColor, foodItem) {
    let cardStyleSheet = cardStyle(bgColor)
    return (
        <View style={cardStyleSheet.background}>
            <View style={cardStyleSheet.body}>
                <Text style={cardStyleSheet.title}>{foodItem.name.toUpperCase()}</Text>
                <View style={cardStyleSheet.nutrientList}>
                    <View style={cardStyleSheet.nutrientColumn}>
                        <View style={cardStyleSheet.nutrientHeaderColumn}>
                            <Text style={cardStyleSheet.nutrientHeader}>CALORIES:</Text>
                            <Text style={cardStyleSheet.nutrientHeader}>CARBS:</Text>
                            <Text style={cardStyleSheet.nutrientHeader}>FAT:</Text>
                            <Text style={cardStyleSheet.nutrientHeader}>PROTEIN:</Text>
                        </View>
                        <View style={cardStyleSheet.nutrientValueColumn}>
                            <Text style={cardStyleSheet.nutrientValue}>{foodItem.calories+"cal"}</Text>
                            <Text style={cardStyleSheet.nutrientValue}>{foodItem.carbs+"g"}</Text>
                            <Text style={cardStyleSheet.nutrientValue}>{foodItem.fat+"g"}</Text>
                            <Text style={cardStyleSheet.nutrientValue}>{foodItem.protein+"g"}</Text>
                        </View>
                    </View>
                    <View style={cardStyleSheet.dividerLine}/>
                    <View style={cardStyleSheet.nutrientColumn}>
                        <View style={cardStyleSheet.nutrientHeaderColumn}>
                            <Text style={cardStyleSheet.nutrientHeader}>SUGAR:</Text>
                            <Text style={cardStyleSheet.nutrientHeader}>SODIUM:</Text>
                            <Text style={cardStyleSheet.nutrientHeader}>CHOLEST.:</Text>
                            <Text style={cardStyleSheet.nutrientHeader}>FIBER:</Text>
                        </View>
                        <View style={cardStyleSheet.nutrientValueColumn}>
                            <Text style={cardStyleSheet.nutrientValue}>{foodItem.sugar+"g"}</Text>
                            <Text style={cardStyleSheet.nutrientValue}>{foodItem.sodium+"mg"}</Text>
                            <Text style={cardStyleSheet.nutrientValue}>{foodItem.cholesterol+"mg"}</Text>
                            <Text style={cardStyleSheet.nutrientValue}>{foodItem.fiber+"g"}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export function MealPager ({mealList}) {
    meals = []
    for (var obj in mealList){
        meals.push(deserializeMeal(mealList[obj]))
    }

    return (
        <PagerView style={mealViewStyle.pager}>
            {meals.map((meal, index) => 
                <View key={index}>
                    <MealView meal={meal}/>
                </View>
            )}
        </PagerView>
    )

}

export function MealView ({meal}) {
    var list = []
    if (meal.entree != null) list.push(meal.entree)
    if (meal.side != null) list.push(meal.side)
    if (meal.dessert != null) list.push(meal.dessert)
    list.push(meal.total)

    return (
        <View style={mealViewStyle.background}>
            {list.map((foodItem, index) => FoodItemCard(colors[index], foodItem))}
        </View>
    )
}

function deserializeFoodItem (obj) {
    return new FoodItem(
        obj.name ?? "TOTAL",
        obj.total_calories,
        obj.total_carbs,
        obj.total_fat,
        obj.protein,
        obj.sugar,
        obj.sodium,
        obj.cholesterol,
        obj.fiber
    )
}

function deserializeMeal (meal) {
    return new Meal(
        deserializeFoodItem(meal.entree),
        deserializeFoodItem(meal.side),
        deserializeFoodItem(meal.dessert),
        deserializeFoodItem(meal.total)
    )
}

const mealViewStyle = StyleSheet.create({
    background: {
        flex: 1,
        alignSelf:'center',
        width: '100%'
    },
    pager: {
        flex: 1
    }
})

const cardStyle = (bgColor) => StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: bgColor,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        alignSelf: 'center',
        width: '87%',
        height: '75%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        fontSize: 15,
        color: '#F4F5F0',
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    nutrientList: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
        
    },
    dividerLine: {
        flex: 0,
        borderRightColor: '#F4F5F0',
        borderRightWidth: 1,
        width: '0%',
        marginHorizontal:'5%'
    },
    nutrientColumn: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width:'50%'
    },
    nutrientHeaderColumn: {
        flex: 6,
        flexDirection: 'column',
    },
    nutrientValueColumn: {
        flex: 4,
        flexDirection: 'column',
    },
    nutrientHeader: {
        color: '#F4F5F0',
        textAlign:'left',
    },
    nutrientValue: {
        color: '#F4F5F0',
        textAlign:'right',
    }
})