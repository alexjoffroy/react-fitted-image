const isModern = window.CSS && CSS.supports && CSS.supports('object-fit', 'cover')

export default isModern