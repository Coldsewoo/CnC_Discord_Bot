const db = require(__basedir + '/coldsewooBOT.js')

module.expors = (member) => {
    var id = member.id;
    db.collection('members_차새').where("memberId", "==", id).remove().then((ref) => {
        console.log(ref);
    })
}