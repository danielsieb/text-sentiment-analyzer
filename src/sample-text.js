const TEXT = {
    '0': 'After school I decided to kill two birds with one stone and go to the store to buy some food for dinner and some aspirin for my headache. My headache was killing me, and I needed to take care of it right away. When I got home, I started cooking dinner. I felt like I was going to die of hunger. After eating, I sat down to read my new book, "Death of a Salesman". My friend said he hated it, but I find myself loving it. Reading is really my favorite thing to do, expecially while camping, laying on my blow up matress in my tent in the wilderness!',
    '1': 'It has been a really rough day. I am hating myself more and more each day. I have suicidal thoughts, but I know killing myself is not the answer. If I were dead, I am sure there would be people who would miss me, but there are other kids that hate me. I feel like I should just blow them all up with a bomb. And maybe I should just be blown up with them.',
    '2': 'I am deathly afraid of flying. In fact, the last time I flew on a plane, we hit some bad turbulance, and I yelled "I don\'t want to die!" in front of everyone. It was pretty embarrassing, but I don\'t hate myself for having those thoughts. I feel justified in my fear, and I hope never to die in a plane crash.'
}

const getSampleText = (index) => {
    return TEXT[index] || ''
}

export default getSampleText