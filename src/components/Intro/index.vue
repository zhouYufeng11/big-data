<template>
	<div class="intro-box">
		<p class="intro">{{ intro }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// const props = defineProps({
// dataList: {
// 	type: Object,
// 	default: { news: {}, whole: {}, city: {} }
// },
// })

const intro = '侨联是党领导的由归侨侨眷组成的人民团体，是党和政府联系广大归侨侨眷和海外侨胞的桥梁和纽带。泰州市归国华侨联合会（简称泰州市侨联）组建于1997年12月，受中共泰州市委领导，其机关参照公务员法管理，列市级群众团体机关序列，为正处级。负责贯彻落实党中央、国务院关于侨联工作的方针政策和省委省政府、市委市政府的相关决策部署，坚持党对侨联工作的领导，坚持以人为本、为侨服务宗旨，履行服务经济发展、依法维护侨益、拓展海外联谊、积极参政议政、弘扬中华文化、参与社会建设，以及加强组织建设、促进高质量发展等工作职能。2018年11月，中共泰州市委研究决定，正式成立中共泰州市侨联党组。按照《泰州市归国华侨联合会机关职能配置、内设机构和人员编制规定》,泰州市侨联机关设办公室、组织建设处（联络联谊处）、维权服务处（共同发展处），现有行政编制人员9名。泰州市侨联现有主席1名，专职副主席1名，挂职副主席1名，兼职副主席4名，秘书长1名，常委16名，委员36名。下设2个社团组织，分别是泰州市侨商会、泰州市新华侨留学生及眷属联谊会。';
</script>

<style lang="scss" scoped>
.intro-box {
	position: relative;
	padding: 20px;
	background: rgba(30, 119, 189, .2);
	height: 175px;
	overflow: auto;
	text-indent: 20px;
	font-size: 14px;
	text-align: left;

	.intro {
		animation: scrollBot 10s linear infinite;
		user-select: none;
	}

	&:hover {
		.intro {
			animation-play-state: paused;
		}
	}
}
</style>