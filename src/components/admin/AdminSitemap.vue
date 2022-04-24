<template>
	<div>
		<div class="sitemap-header">
			<input type="button" value="사이트맵 가져오기" class="btn btn-sm btn-primary" @click="getPostId">
		</div>
		<div class="h-100 w-100">
			<textarea cols="30" rows="10" class="sitemap-container" v-model="sitemapString"></textarea>
		</div>
	</div>
</template>

<script>
const format = require('xml-formatter');
export default {
	data() {
		return {
			postIdList: [],
			sitemapString: "",
		}
	},
	methods: {
		getPostId: function() {
			this.$axios.get('/api/admin/post/sitemap')
				.then(response => {
					for (const post of response.data.posts) {
						this.postIdList.push(post._id);
					}
					this.makeSitemap();
				})
				.catch(e => {console.log(e)})
		},
		makeSitemap: function() {
			const date = (new Date).toISOString();
			let sitemapStr = `
				<?xml version="1.0" encoding="UTF-8"?>
				<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
							xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
							xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
										http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
				<url><loc>http://wooncou.com/</loc><lastmod>${date}</lastmod></url>
				<url><loc>http://wooncou.com/tags</loc><lastmod>${date}</lastmod></url>
				<url><loc>http://wooncou.com/report</loc><lastmod>${date}</lastmod></url>
				<url><loc>http://wooncou.com/posts</loc><lastmod>${date}</lastmod></url>
				<url><loc>http://wooncou.com/goldbox</loc><lastmod>${date}</lastmod></url>
			`
			for (const id of this.postIdList) {
				const templateString = `<url><loc>http://wooncou.com/detail/${id}</loc><lastmod>${date}</lastmod></url>`;
				sitemapStr += templateString;
			}
			sitemapStr += "</urlset>";
			this.sitemapString = format(sitemapStr.trim());
		}
	},
}
</script>

<style>
	.sitemap-header {
		margin: 10px 0;
	}

	.sitemap-container {
		height: 100%;
		width: 100%;
		border: 1px solid lightgray;
		border-radius: 4px;
	}
</style>