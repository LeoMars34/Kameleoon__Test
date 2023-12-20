import { useEffect, useState } from 'react';
import { getCurrentTests, getSites, getTests } from '../Api';
import { useNavigate } from 'react-router-dom';

export function Dashboard({ setCurrentSites }) {
    const [sites, setSites] = useState();
    const [tests, setTests] = useState();
    const [names, setNames] = useState();
    const [filterArray, setFilterArray] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getSites().then((data) => {
            setSites(data);
        });
        getTests().then((data) => {
            setTests(data);

            setNames(data.name);
            setFilterArray(data);
        });
    }, []);

    function filter(e) {
        if (e.target.value) {
            setFilterArray(() => {
                const newTests = tests.filter((item) =>
                    item.name.includes(e.target.value)
                );
                newTests.length === 0 &&
                    setError(
                        <p className="errorMessage">
                            Your search did not match any results.
                        </p>
                    );
                return newTests;
            });
        } else {
            setFilterArray(tests);
        }
    }
    function reset() {
        window.location.reload();
    }
    function pathToFinalize(i) {
        getCurrentTests(i.id).then((data) => {
            setCurrentSites(data);
            navigate(`/Finalize/${data.id}`);
        });
    }
    function pathToResults(i) {
        getCurrentTests(i.id).then((data) => {
            setCurrentSites(data);
            navigate(`/Results/${data.id}`);
        });
    }

    function sortName(e) {
        const index = [...e.target.parentNode.cells].indexOf(e.target);
        let sortedRows = Array.from(document.getElementById('table').rows)
            .slice(1)
            .sort((rowA, rowB) =>
                rowA.cells[index].innerHTML > rowB.cells[index].innerHTML
                    ? 1
                    : -1
            );

        document.getElementById('table').tBodies[0].append(...sortedRows);
    }
    function sortStatus(e) {
        const statusOrder = {
            Online: 1,
            Paused: 2,
            Stopped: 3,
            Draft: 4,
        };
        const order = (e.target.dataset.order = -(
            e.target.dataset.order || -1
        ));
        const index = [...e.target.parentNode.cells].indexOf(e.target);
        let sortedRows = Array.from(document.getElementById('table').rows)
            .slice(1)
            .sort((rowA, rowB) =>
                statusOrder[rowA.cells[index].innerHTML] >
                statusOrder[rowB.cells[index].innerHTML]
                    ? 1 * order
                    : -1 * order
            );
        document.getElementById('table').tBodies[0].append(...sortedRows);
    }
    return (
        <div className="main">
            <h1>Dashboard</h1>
            <div className="divSearch">
                <label>
                    <ion-icon name="search-outline"></ion-icon>
                </label>
                <input
                    onInput={(e) => {
                        filter(e);
                    }}
                    className="inputSearch"
                    type="text"
                    placeholder="What test are you looking for?"
                />
            </div>
            {error ? (
                <div className="error">
                    {error}

                    <button
                        onClick={reset}
                        style={{
                            backgroundColor: '#2EE5AC',
                        }}
                    >
                        Reset
                    </button>
                </div>
            ) : (
                <table id="table">
                    <thead>
                        <tr>
                            <th
                                onClick={(e) => {
                                    sortName(e);
                                }}
                            >
                                NAME
                            </th>
                            <th
                                onClick={(e) => {
                                    sortName(e);
                                }}
                            >
                                TYPE
                            </th>
                            <th
                                onClick={(e) => {
                                    sortStatus(e);
                                }}
                            >
                                STATUS
                            </th>
                            <th
                                onClick={(e) => {
                                    sortName(e);
                                }}
                            >
                                SITE
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterArray
                            ? filterArray.map((i) => (
                                  <tr key={i.id}>
                                      <td
                                          style={
                                              i.name === 'Dark theme test' ||
                                              i.name ===
                                                  'Prototype of a new header'
                                                  ? {
                                                        borderLeft:
                                                            '4px solid #8686FF',
                                                    }
                                                  : i.name ===
                                                        'Order basket redesing' ||
                                                    i.name ===
                                                        "New Year's Sale" ||
                                                    i.name ===
                                                        "New Year's Sale Copy 1"
                                                  ? {
                                                        borderLeft:
                                                            '4px solid #E14165',
                                                    }
                                                  : i.name ===
                                                        'Prototype of the new map' ||
                                                    i.name ===
                                                        'Spring promotion'
                                                  ? {
                                                        borderLeft:
                                                            '4px solid #C2C2FF',
                                                    }
                                                  : null
                                          }
                                          className="tdName"
                                      >
                                          {i.name}
                                      </td>
                                      <td>
                                          {i.type[0] +
                                              i.type.slice(1).toLowerCase()}
                                      </td>

                                      <td
                                          style={
                                              i.status === 'ONLINE'
                                                  ? { color: '#2EE5AC' }
                                                  : i.status === 'PAUSED'
                                                  ? {
                                                        color: '#FF8346',
                                                    }
                                                  : i.status === 'STOPPED'
                                                  ? { color: '#FE4848' }
                                                  : null
                                          }
                                      >
                                          {i.status[0] +
                                              i.status.slice(1).toLowerCase()}
                                      </td>
                                      <td>
                                          {sites
                                              ? sites.map((j) => {
                                                    if (i.siteId === j.id) {
                                                        return j.url
                                                            .replace(
                                                                'https://www.',
                                                                ''
                                                            )
                                                            .replace(
                                                                'https://',
                                                                ''
                                                            )
                                                            .replace(
                                                                'http://',
                                                                ''
                                                            );
                                                    }
                                                })
                                              : null}
                                      </td>
                                      <td>
                                          {i.status === 'DRAFT' ? (
                                              <button
                                                  onClick={() => {
                                                      pathToFinalize(i);
                                                  }}
                                                  style={{
                                                      backgroundColor:
                                                          '#2EE5AC',
                                                  }}
                                              >
                                                  Finalize
                                              </button>
                                          ) : (
                                              <button
                                                  onClick={() => {
                                                      pathToResults(i);
                                                  }}
                                                  style={{
                                                      backgroundColor:
                                                          '#7D7D7D',
                                                  }}
                                              >
                                                  Rezults
                                              </button>
                                          )}
                                      </td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            )}
        </div>
    );
}
