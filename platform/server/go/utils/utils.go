package utils

import (
	"bytes"
	"encoding/gob"
	"encoding/json"
)

func HandleErr(err error) {
	if err != nil {
		panic(err)
	}
}

func ToJSON(i interface{}) []byte {
	r, err := json.Marshal(i)
	HandleErr(err)
	return r
}

func FromBytes(i interface{}, data []byte) { // ex (interface{}: 블록의 포인터, data: data) -> data를 포인터로 복원
	encoder := gob.NewDecoder(bytes.NewReader(data)) // 디코더 생성
	HandleErr(encoder.Decode(i))
}
