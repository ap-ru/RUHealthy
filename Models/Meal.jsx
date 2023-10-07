class Meal {
    constructor (entree = null, side = null, dessert = null) {
        this.entree = entree
        this.side = side
        this.dessert = dessert
    }

    get total () {
        return new FoodItem(
            "TOTAL",
            this.totalCalories,
            this.totalCarbs,
            this.totalFat,
            this.totalProtein,
            this.totalSugar,
            this.totalSodium,
            this.totalCholesterol,
            this.totalFiber
        )
    }

    //fat, protein, sugar, sodium, cholesterol, fiber

    get totalCalories () {
        return (entree?.calories ?? 0) + (side?.calories ?? 0) + (dessert?.calories ?? 0)
    }

    get totalCarbs () {
        return (entree?.carbs ?? 0) + (side?.carbs ?? 0) + (dessert?.carbs ?? 0)
    }

    get totalFat () {
        return (entree?.fat ?? 0) + (side?.fat ?? 0) + (dessert?.fat ?? 0)
    }

    get totalProtein () {
        return (entree?.protein ?? 0) + (side?.protein ?? 0) + (dessert?.protein ?? 0)
    }

    get totalSugar () {
        return (entree?.sugar ?? 0) + (side?.sugar ?? 0) + (dessert?.sugar ?? 0)
    }

    get totalSodium () {
        return (entree?.sodium ?? 0) + (side?.sodium ?? 0) + (dessert?.sodium ?? 0)
    }

    get totalCholesterol () {
        return (entree?.cholesterol ?? 0) + (side?.cholesterol ?? 0) + (dessert?.cholesterol ?? 0)
    }

    get totalFiber () {
        return (entree?.fiber ?? 0) + (side?.fiber ?? 0) + (dessert?.fiber ?? 0)
    }
}