import api from '@/utils/BaseApi'

export default {
  auth(site_id) {
    return api.get('client/test_auth', {
      headers: {
        'Leadhit-Site-Id': site_id
      }
    })
  },
}
