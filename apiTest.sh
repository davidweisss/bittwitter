wget 'https://bittwitter.rocks/graphql?query={getAuthToken(input: {handle: "nick", password: "nick"}) {token}}' -O - -o /dev/null
wget 'https://bittwitter.rocks/graphql?query={getAuthToken(input: {handle: "nick", password: "knick"}) {token}}' -O - -o /dev/null
