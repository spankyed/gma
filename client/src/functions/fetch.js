const getRequest = async url => {
  return await fetch(url).then((response) => {
    //response.json().then(f=>console.log('ffs',f))
    return response.json();
  });
  //return await response.json()
  //.catch(err => console.log(err))  
}

const postRequest = async (url,data) => {
    return await fetch(url, {
        method: 'POST',
        body: data
    }).then((response) => {
      //response.json().then(f=>console.log('ffs',f))
      return response.json();
    });
  //.catch(err => console.log(err))
}


export default {
  getCollections:  _ => getRequest('/collections/list'),
  getFilteredProductsByTablePage:  (query,page) => getRequest('/products/tablelist' + `?filter=${query}&page=${page}`),
  getFilteredProductsByPage:  (query,page) => getRequest('/products/pagelist' + `?filter=${query}&page=${page}`),
  deleteCollection: collection => postRequest('/collections/delete', collection)
}