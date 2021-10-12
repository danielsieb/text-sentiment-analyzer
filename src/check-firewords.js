import delay from 'delay'

// TODO: Update this algorithm so that we can improve our detection of dangerous language that someone might submit
//       Requirements:
//        - Must return null/undefined/false if no dangerous language was detected
//        - Must return an array of objects containing the matching dangerous language and the location of the match if dangerous language was found
//        - Must remain an async function
const checkFirewords = async (input) => {

  await delay(1000);

  /***************************************************************************/
  /*  The following part is an API call to the Google NLP API which returns  */
  /*  a sentiment score of the text. The API key is open for simplification  */
  /*  purposes. --> Testing only                                             */
  /***************************************************************************/

  var sentimentScore = null
  var sentiment = null

  await delay(1000);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({'document': {'type': 'PLAIN_TEXT', 'content': input},
      'encodingType': 'UTF8'
    })
  }

  try {

    const response = await fetch('https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key=AIzaSyCdknBvWwQVzuUdkW_1_K4CIB2pRAY1u4s',
                    requestOptions);
    const data = await response.json();

    sentimentScore = data.documentSentiment.score

    // Translating sentiment score to a sentiment...
    if (sentimentScore < 0) {
       sentiment = 'negative'
    } else if (sentimentScore > 0) {
      sentiment = 'positive'
    } else {
      sentiment = 'neutral'
    }

  } catch (err) {

    console.log(err)

    return null

  }
  
  return sentiment

} // checkFireworks async (input)

export default checkFirewords