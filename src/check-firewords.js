import delay from 'delay'

// TODO: Update this algorithm so that we can improve our detection of dangerous language that someone might submit
//       Requirements:
//        - Must return null/undefined/false if no dangerous language was detected
//        - Must return an array of objects containing the matching dangerous language and the location of the match if dangerous language was found
//        - Must remain an async function
const checkFirewords = async (input) => {

  await delay(1000);

  // List of possible firewords --> can be extended down below
  const possibleFirewords = ['kill', 'killing', 'killed', 'kills', 'die', 'dying', 'dead', 'death', 'died', 'dies',
                            'suicide', 'suicidal', 'hate myself', 'hated myself', 'hates myself', 'hating myself',
                            'blow up', 'blew up', 'blows up', 'blowing up', 'blown up']

  var firewordList = []

  for (var index in possibleFirewords) {

    if (input.includes(possibleFirewords[index])) {
      
      firewordList.push({
        phrase: possibleFirewords[index],
        location: input.indexOf(possibleFirewords[index])
      })

    }

  }

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

  }

  if (firewordList.length !== 0 ) {
    return [firewordList, sentiment]
  }
  
  return [null, null]

} // checkFireworks async (input)

export default checkFirewords