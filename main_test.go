package main

import (
	"bytes"
	"testing"
)

func TestWipeBytes(t *testing.T) {
	data := []byte("temporary message")
	wipeBytes(data)

	if !bytes.Equal(data, make([]byte, len(data))) {
		t.Fatalf("wipeBytes did not clear the buffer: %v", data)
	}
}

func TestQueueMessageCopiesPayload(t *testing.T) {
	client := &Client{send: make(chan []byte, 1)}
	source := []byte("temporary message")

	if !queueMessage(client, source) {
		t.Fatal("queueMessage unexpectedly rejected the message")
	}

	wipeBytes(source)
	queued := <-client.send
	defer wipeBytes(queued)

	if string(queued) != "temporary message" {
		t.Fatalf("queued payload was changed with the source buffer: %q", queued)
	}
}
