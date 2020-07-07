export default function (context) {
  if (!context.$currentUser.get()) {
    context.redirect('/login')
  }
}
