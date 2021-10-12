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
    setApiRes(firewordResult)
  }


  return (
    <>
    <Menu stackable>
      <Menu.Item>
        { /* Insert your logo */ }
      </Menu.Item>
    </Menu>
    <Container style={{ marginTop: 20 }}>
      <Header as='h2' icon='fire' content='Text Sentiment Analyzer' />
      <Segment>
        <Form onSubmit={handleSubmit} loading={isChecking}>
          <Button type='button' onClick={() => setFieldText(getSampleText(0))}>Insert Sample Text #1</Button>
          <Button type='button' onClick={() => setFieldText(getSampleText(1))}>Insert Sample Text #2</Button>
          <Button type='button' onClick={() => setFieldText(getSampleText(2))}>Insert Sample Text #3</Button>
          <Divider/>
          <TextArea style={{ marginBottom: 10 }} placeholder='Type your text' value={fieldText} onChange={(e, data) => setFieldText(data.value)} />
          <Button floated='right' color='blue' type='submit'>Submit</Button>
          <br style={{ clear:'both' }}/>
        </Form>
      </Segment>
      {(hasSubmitted && !!apiRes) && (
        <Message error>
          <Message.Header>Sentiment detected</Message.Header>
          {/* Sentiment Score of Google NLP API */}
          <h4>Sentiment from Google NLP API</h4>
          {
            <p>
              Sentiment: {apiRes}
            </p>
          }
        </Message>
      )}
      {(hasSubmitted && !apiRes) && (
        <Message success>
          <Message.Header>Couldn't detect sentiment</Message.Header>
        </Message>
      )}
    </Container>
    </>
  );
}

export default App
