export default (condition) => condition
  ? { display: 'flex' }
  : { display: 'none', position:'relative' };