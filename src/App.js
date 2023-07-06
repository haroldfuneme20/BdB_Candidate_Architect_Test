/* src/App.js */
import React, { useEffect, useState } from 'react'
import { withAuthenticator, Button, Heading, Text, TextField, View, Image } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createBdBTest, deleteBdBTest } from './graphql/mutations'
import { listBdBTests } from './graphql/queries'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = ({ signOut, user }) => {
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
      await API.graphql(graphqlOperation(createBdBTest, { input: bdbTestForm }))
    } catch (err) {
      console.log('error creating BdBTests:', err)
    }
  }

  async function deleteUser(id) {
    try {
      await API.graphql(graphqlOperation(deleteBdBTest, { input: { id } }))
      bdBTests()
    } catch (err) {
      console.log('error deleting BdBTest:', err)
    }
  }

 

  return (
  

    <View >
      <Image
        alt="Amplify logo"
        src="/Open-source-Amplify-framework.png"
        objectFit="initial"
        backgroundColor="initial"
        height="400px"
        width="100%"
        style={{ marginBottom: "20px" }}
        onClick={() => alert('📸 Say cheese!')}
      />
      <View style={styles.container} >

        <Heading level={1}>Hello {user.username}</Heading>
        <Button style={styles.button_signout} onClick={signOut}>Sign out</Button>
        <Heading level={2}>Mutations Results</Heading>
        <Button style={styles.button_add_data} onClick={addBdBTests}>ADD DATA</Button>
        <TextField
          onChange={event => setInput('name', event.target.value)}
          style={styles.input}
          value={formState.name}
          placeholder="Name"
        />
        <TextField
          onChange={event => setInput('description', event.target.value)}
          style={styles.input}
          value={formState.description}
          placeholder="Description"
        />


        <Heading level={2}>Query Results</Heading>

        {
          bdbTests.map((bdbTest, index) => (
            <View key={bdbTest.id ? bdbTest.id : index} style={styles.bdbTest}>
              <Text style={styles.bdbTestName}>{bdbTest.name}</Text>
              <Text style={styles.bdbTestDescription}>{bdbTest.description}</Text>
              <Button onClick={() => deleteUser(bdbTest.id)}>Delete</Button> {}
            </View>
          ))
        }
      </View>
    </View>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  bdbTest: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  bdbTestName: { fontSize: 20, fontWeight: 'bold' },
  bdbTestDescription: { marginBottom: 0 },
  button_signout: { backgroundColor: 'red', color: 'white', width: 'auto', fontSize: 18, padding: '12px 0px' },
  button_add_data: { backgroundColor: 'orange', color: 'white', width: 'auto', outline: 'none', fontSize: 18, padding: '12px 0px' }
}


export default withAuthenticator(App);