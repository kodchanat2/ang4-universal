import { Injectable } from '@angular/core';
import { Meta }  from '@angular/platform-browser';


@Injectable()
export class MetaService {
	constructor(private meta: Meta) {};

	private tags = {
		default: [
		{ name: 'Writer', content: 'Adam young'},
		{ name: 'Singer', content: 'Justin Barber'}
		],
		dashboard: [
		{ pageTag: 'dashboard' },
		{ name: 'Direct', content: 'angry bird'},
		{ property: 'Dinner', content: 'Happy meals'}
		],
		detail: [
		{ pageTag: 'detail' },
		{ name: 'page', content: '0'},
		{ property: 'Dinner', content: 'Pizza hut 1150'}
		]
	}

	setDefaultTag(): void {
		let selector = this.attrString(this.tags.default);
		if(!this.meta.getTag("name='Writer'"))
			this.meta.addTags(this.tags.default, true);
	}

	setDetailTag(id: number): void {
		if(this.isTaged(this.tags.detail)) return;

		this.meta.addTags(this.tags.detail);
		this.meta.updateTag({'content': ''+id}, "name='page'");
	}

	setDashboardTag(): void {
		if(this.isTaged(this.tags.dashboard)) return;

		this.meta.addTags(this.tags.dashboard);
	}


	private isTaged(array: object): boolean{
		let selector = this.attrString(array);
		if(this.meta.getTag(selector))
			return true;
		else {
			this.clearTag();
			return false;
		}
	}

	private clearTag(): void {
		for(var i in this.tags) {
			if(i == "default") continue;

			// var selector = this.attrString(this.tags[i]);
			// if(this.meta.getTag(selector))
				// this.removeTag(this.tags[i]);
				for(var j in this.tags[i]) {
					var selector = this.attrString(this.tags[i][j]);
					while(this.meta.getTag(selector))
						this.meta.removeTag(selector);
				}
		}
	}

	private attrString(obj: object): string{
		return JSON.stringify(obj)
		.replace('}',',')
		.split(',')[0]
		.replace(/\[|\{|\"/g,'')
		.replace(/:/g,"='")
		.concat("'");
	}

}
