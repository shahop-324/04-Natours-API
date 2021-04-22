/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
      // sort('-price -ratingAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      console.log(fields);
      // query = query.select('name duration difficulty price');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; // either user will specify page no. or by default page no. will be set to 1
    const limit = this.queryString.limit * 1 || 4; // either user will specify the limit or by default the limit will be set to 10
    const skipVal = (page - 1) * limit; // skipVal is the no. of results that will be skipped
    // page=3&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
    this.query = this.query.skip(skipVal).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
