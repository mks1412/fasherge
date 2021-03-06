import { mockState, mockUserProfile } from './mock'
import { mutations } from '@/store/user/mutations'
import { UserState } from '@/store/user/types'
import { UserProfileEntity, Gender, UserParams } from '@/entities/User'

let state: UserState

describe('User mutations', () => {
  beforeEach(() => {
    state = mockState()
  })

  describe('set firebase user data', () => {
    const fbdata = { id: 'hoge', email: 'hoge@gmail.com' }
    test('works', () => {
      mutations.setFirebaseUserData(state, fbdata)
      expect(state.fbdata).toEqual(fbdata)
    })
  })

  describe('set user', () => {
    const newUser: UserProfileEntity = mockUserProfile(1)
    test('works', () => {
      mutations.setUser(state, newUser)
      expect(state.profile).toEqual(newUser)
    })
  })

  describe('update user', () => {
    const params: UserParams = { name: 'changed', age: 12, gender: Gender.female }
    test('works', () => {
      mutations.updateUser(state, params)
      expect(state.profile.name).toEqual(params.name)
      expect(state.profile.age).toEqual(params.age)
      expect(state.profile.gender).toEqual(params.gender)
    })
  })

  describe('set loading', () => {
    test('works', () => {
      mutations.setLoading(state, true)
      expect(state.loading).toEqual(true)
      mutations.setLoading(state, false)
      expect(state.loading).toEqual(false)
    })
  })
})
