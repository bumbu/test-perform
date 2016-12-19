export default class Search {
  /**
   * Search constructor
   *
   * @constructor
   * @param  {Object} request Request Object
   * @param  {string} apiUrl  Search API URL base
   * @param  {string} apiKey  API key
   */
  constructor(request, apiUrl, apiKey) {
    this._request = request
    this._apiUrl = apiUrl
    this._apiKey = apiKey
    this._lastQuery = ''
    this._lastPage = 0
  }

  /**
   * Make a new query by given string
   *
   * @param  {string} query New query
   * @return {Promise}      Gets resolved when query is resolved or failed
   */
  searchBy(query) {
    return this._makeRequest(query, 1)
  }

  /**
   * Loads one more page based on previous request
   *
   * @return {Promise}    Gets resolved when query is resolved or failed
   */
  loadMore() {
    return this._makeRequest(this._lastQuery, this._lastPage + 1)
  }

  /**
   * Makes a request using given query and page
   *
   * @param  {string} query Search query
   * @param  {number} page  Results page number
   * @return {Promise}      Gets resolved when query is resolved or failed
   */
  _makeRequest(query, page) {
    return new Promise((resolve, reject) => {
      this._request
        .get(this._apiUrl)
        .query({api_key: this._apiKey, query, page})
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            this._lastQuery = query
            this._lastPage = page
            resolve(res.body.results)
          }
        })
    })
  }
}
