import axios from 'axios'
import store from '../../src/store'

describe('member store', () => {
  const memberTestId = 'tester'
  const testnickname = 'testnickname'

  const commit = store.commit
  window.alert = jest.fn()// Mock 함수 생성
  jest.mock('axios')
  axios.post = jest.fn().mockReturnValue(Promise.resolve({
    data: 'testnickname'
  })
  )

  describe('state에 맴버 id 저장', () => {
    it('멤버id state 저장 후 불러오기', async () => {
      await store.dispatch('member/logIn', memberTestId)
      expect(store.getters['member/getMemberId']).toEqual(memberTestId)
    })

    it('닉네임 state 저장 후 불러오기', async () => {
      store.dispatch('member/nicknameAction')
      await axios.post('/member/nickname')
        .then((response) => {
          commit('member/setNickname', response.data) // store.member
        })
      expect(store.getters['member/getNickname']).toEqual(testnickname)
    })

    it('로그아웃', () => {
      store.dispatch('member/logout')
      commit('member/setMemberId', null)
      expect(store.getters['member/getMemberId']).toEqual(null)
    })
  })
})
