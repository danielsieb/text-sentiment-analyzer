import { useState } from 'react'
import { to } from 'await-to-js'
import {
  Form,
  TextArea,
  Segment,
  Container,
  Button,
  Header,
  Message,
  Menu,
  Divider,
} from 'semantic-ui-react'

import checkFirewords from './check-firewords'
import getSampleText from './sample-text'

function App() {

  const [ isChecking, setIsChecking ] = useState(false)
  const [ hasSubmitted, setHasSubmitted ] = useState(false)
  const [ fieldText, setFieldText ] = useState('')
  const [ firewords, setFirewords ] = useState()
  const [ apiRes , setApiRes ] = useState()

  const handleSubmit = async () => {
    if (!fieldText.length) {
      setHasSubmitted(false)
      return
    }
    setIsChecking(true)
    setHasSubmitted(false)
    const [ fireWordError, firewordResult ] = await to(checkFirewords(fieldText))
    if (fireWordError) {
      throw fireWordError
    }
    setIsChecking(false)
    setHasSubmitted(true)
    setFirewords(firewordResult[0])
    setApiRes(firewordResult[1])
  }


  return (
    <>
    <Menu stackable>
      <Menu.Item>
        <img style={{ width: 100 }} alt='logo' src='https://media.base.education/img/base-logo.png' />
      </Menu.Item>
    </Menu>
    <Container style={{ marginTop: 20 }}>
      <Header as='h2' icon='fire' content='Fireword Detector' />
      <Message
        info
        icon='info circle'
        header='Problem Description'
        content={(
          <>
            <p>We need to be able to detect potentially dangerous language in the text that a user types so that we can alert someone to get them help. This can seem somewhat dark, but it's critical to peoples' safety in some cases.</p>
            <p>Your task is to modify the current alorgithm (located in <code>./src/check-firewords.js</code>) so that the UI will show all matches of potentially dangerous language found within the text that is submitted.</p>
            <p>Analyzing language is difficult, so expect to have some false positives. The goal is to minimize the number of false positives while also not missing any dangerous language. Several sample texts are available for you to test your algorithm on. But you should also test other text on your own. For the purpose of this exercise, please only detect the following words/phrases (in any tense): <code>kill</code>, <code>die</code>, <code>suicide</code>, <code>hate myself</code>, and <code>blow up</code>.</p>
          </>
        )}
      />
      <Segment>
        <Form onSubmit={handleSubmit} loading={isChecking}>
          <Button type='button' onClick={() => setFieldText(getSampleText(0))}>Insert Sample Text #1</Button>
          <Button type='button' onClick={() => setFieldText(getSampleText(1))}>Insert Sample Text #2</Button>
          <Button type='button' onClick={() => setFieldText(getSampleText(2))}>Insert Sample Text #3</Button>
          <Divider/>
          <TextArea style={{ marginBottom: 10 }} placeholder='Tell us more' value={fieldText} onChange={(e, data) => setFieldText(data.value)} />
          <Button floated='right' color='blue' type='submit'>Submit</Button>
          <br style={{ clear:'both' }}/>
        </Form>
      </Segment>
      {(hasSubmitted && !!firewords) && (
        <Message error>
          <Message.Header>Fireword detected</Message.Header>
          {/* TODO: display each matching fireword and location of fireword */
            firewords.map(fireword => (
              <p>
                "{fireword.phrase}" at location {fireword.location}
              </p>
            ))
          }
          {/* Additional: Sentiment Score of Google NLP API */}
          <h4>Sentiment from Google NLP API</h4>
          {
            <p>
              Sentiment: {apiRes}
            </p>
          }
        </Message>
      )}
      {(hasSubmitted && !firewords) && (
        <Message success>
          <Message.Header>No fireword detected</Message.Header>
        </Message>
      )}
    </Container>
    </>
  );
}

export default App
