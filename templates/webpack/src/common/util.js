export default {
	asyn(type){
		return `FETCH_${type}`
	},
	sync(type){
		return `LOCAL_${type}`
	},
	isAsyn(type){
		return type.indexOf("FETCH_") == 0
	},
	isSync(type){
		return type.indexOf("LOCAL_") == 0
	},
	success(type){
		return `FETCH_${type}_SUCCESS`
	},
	failure(type){
		return `FETCH_${type}_FAILURE`
	},
}