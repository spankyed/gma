const getRequest = async url => {
  return await fetch(url).then((response) => {
    response.json().then(f=>console.log('ffs',f))
    //debugger
    //return response.json();
  });

  //return await response.json()
  //.catch(err => console.log(err))  
}

const postRequest = async (url,data) => {
    return await fetch(url, {
        method: 'POST',
        body: data
    }).json();
  
  //.catch(err => console.log(err))
}

export default {
  getCollections: _=> getRequest('/collections/list'),
  //getQuery: query => getRequest(API_URL + `?filter=${query}&type=tag`)
}