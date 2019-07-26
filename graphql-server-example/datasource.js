const { RESTDataSource } = require("apollo-datasource-rest");

class CategoriesAPI extends RESTDataSource{
    constructor() {
        super()
        this.baseURL='localhost:8080/'
        console.log('in sursa')
    }
    async getAllCategories() {
        const response = await this.getAllCategories('getCategories')
        return Array.isArray(response)? response.map((category)=>{
            console.log(response);
            return {
                categoryId:category.categoryId,
                CategoryName:category.CategoryName
            }
        }):[]
    }
}

module.exports = CategoriesAPI