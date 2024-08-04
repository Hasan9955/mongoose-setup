import { FilterQuery, Query } from "mongoose";


class QueryBuilder<T>{
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>){
    this.modelQuery = modelQuery;
    this.query = query;
}


//Method 1: Search
search(searchableFields: string[]){
    if(this?.query.searchTerm){
        this.modelQuery = this.modelQuery.find({
            $or: searchableFields.map((field) => ({
                [field]: { $regex: this.query.searchTerm, $options: 'i' },
            }) as FilterQuery<T>)
        })
    }
    
    return this;
}

//Method 2: Filter
filter(){
    const queryObj = {...this?.query}
    const excludeFields = ['searchTerm', 'sort', 'limit', 'skip', 'page', 'fields']
    excludeFields.forEach(el => delete queryObj[el])
    
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this;
}

//Method 3: Sorting
sort(){
    const sort = this?.query?.sort || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)
    return this;
}

//Method 4: Pagination
paginate(){
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 100;
    const skip = (page -1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)
    return this;
}

//Method 5: FieldsQuery
fields(){
    const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields)
    return this;
}


}


export default QueryBuilder;