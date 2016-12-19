import Search from './search'
import superagent from 'superagent'
import sMocker from 'superagent-mocker'

const mock = sMocker(superagent)

describe('(Search)', () => {
  let search
  const URL = 'http://local.url/'
  const KEY = 'random_key'

  beforeEach(() => {
    search = new Search(superagent, URL, KEY)
  })

  it('Search should return a Promise', () => {
    expect(search.searchBy('str').then).toBeA('function')
  })

  it('Load more should return a Promise', () => {
    expect(search.loadMore().then).toBeA('function')
  })

  it('Search should call the API', () => {
    const query = 'test'

    mock.get(`${URL}`, function (req) {
      expect(req.query).toEqual({api_key: KEY, query, page: '1'})

      return {
        body: {
          results: [{key: 1}, {key: 2}]
        }
      }
    })

    return search.searchBy(query)
      .then((data) => {
        expect(data).toEqual([{key: 1}, {key: 2}])
        mock.clearRoutes()
      })
  })

  it('Load more should call the API, reuse the query and increment the page', function () {
    this.timeout(3000) // Increase timeout, otherwise a timeout may occur
    const query = 'test'

    mock.get(`${URL}`, function (req) {
      expect(req.query.query).toEqual(query)

      return {
        body: {
          results: req.query.page === '1' ? [{key: 1}, {key: 2}] : [{key: 3}, {key: 4}]
        }
      }
    })

    return search.searchBy(query)
      .then((data) => {
        expect(data).toEqual([{key: 1}, {key: 2}])
      })
      .then(() => search.loadMore())
      .then((data) => {
        expect(data).toEqual([{key: 3}, {key: 4}])
        mock.clearRoutes()
      })
  })
})
