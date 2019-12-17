export function findUserInRecommendationList(teaser,recommendationList)
{
    var userData = null;
    recommendationList.forEach(user => {
        if (teaser.user.photos[0].id === user.user.photos[0].id) {
            userData = user.user;
            return;
        }
    })
    return userData;
}


export function findUserInTeaserList(user,teaserList)
{
  var found = false;
  teaserList.forEach(teaser => {
    if(teaser.user.photos[0].id ===user.user.photos[0].id)
    {
      found = true;
      return;
    }
  })
  return found;
}