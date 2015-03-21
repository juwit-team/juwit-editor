#!/bin/bash
#start webdriver session and app and own bashes
(($(npm bin)/webdriver-manager start &) &)
((npm start &) &)
#wait for app and webdriver session to start
sleep 10
#start e2e tests
$(npm bin)/protractor tests/e2e/config.js
#wait for test to finish
wait $!
kill $(pidof node)
kill $(pidof java)
