/* src/App.js */
import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createBdBTest } from './graphql/mutations'
import { listBdBTests } from './graphql/queries'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [bdbTests, setBdBTests] = useState([])

  useEffect(() => {
    bdBTests()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function bdBTests() {
    try {
      const BdBTests = await API.graphql(graphqlOperation(listBdBTests))
      const bdbTests = BdBTests.data.listBdBTests.items
      setBdBTests(bdbTests)
    } catch (err) { console.log('error fetching BdBTests') }
  }

  async function addBdBTests() {
    try {
      if (!formState.name || !formState.description) return
      const bdbTestForm = { ...formState }
      setBdBTests([...bdbTests, bdbTestForm])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createBdBTest, {input: bdbTestForm}))
    } catch (err) {
      console.log('error creating BdBTests:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify BdBTests</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addBdBTests}>Create BdBTests</button>
      {
        bdbTests.map((bdbTest, index) => (
          <div key={bdbTest.id ? bdbTest.id : index} style={styles.bdbTest}>
            <p style={styles.bdbTestName}>{bdbTest.name}</p>
            <p style={styles.bdbTestDescription}>{bdbTest.description}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  bdbTest: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  bdbTestName: { fontSize: 20, fontWeight: 'bold' },
  bdbTestDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App