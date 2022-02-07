const product = require('../models/products')

const getAllProductsStatic = async (req, res)=>{
    const search = 'ab'
    const products = await product.find({})
        .sort('name')
        .select('name price')
        .limit(10)
        .skip(3)
    res.status(200).json({
        data: products,
        nbHits: products.length,
    })
}

const getAllProducts = async (req, res)=>{
    const { featured, company, name , sort, fields, numericFilter} = req.query
    const queryObject = {}

    if (featured){
        queryObject.featured = featured === 'true'? 'true': 'false'
    }
    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if(numericFilter){
        const numericOptions = ['rating', 'price']
        const filters = numericFilter.split(',')
        filters.forEach(filter=>{
            const [ operator,fields ] = filter.split('-')
            const [field, value] = fields.split('=')
            if (numericOptions.includes(field)){
                queryObject[field] = {['$'+operator]: Number(value)}
            }
        })
        console.log(queryObject)
    }
    let result = product.find(queryObject)
    if (sort){
        const sortedList = sort.split(',').join(' ')
        result = result.sort(sortedList)
    }else{
        result.sort('createdAt')
    }
    if (fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({
        data: products,
        nbHits: products.length,
    })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}