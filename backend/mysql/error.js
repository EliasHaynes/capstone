const errorOccurred = (res, err) => {
    console.log('SQL Error: ', err)
    return res.status(500).send('Something went wrong');
  }
  
  module.exports = { errorOccurred }