import { localRetrieve } from '@/utils/local_storage'

const getCurrentUser = () => localRetrieve('user_id')

const getCurrentToken = () => localRetrieve('token')

export { getCurrentUser, getCurrentToken }
