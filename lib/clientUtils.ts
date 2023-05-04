import { isTypedArray } from "util/types";
import { Category, CategoryType, Post, Search } from "./types";
import jsonSearches from "./searches.json";
export function _slug(text: string){
    return text.replaceAll(" ", "-").toLowerCase();
}

export function _sliceArray<T=any>(inputArray: T[], arrayCount: number): T[][]{
    let arrays = []
    let copyArray = [...inputArray]
    let divideFactor = Math.floor(inputArray.length / arrayCount)
    for(let i = 0; i < divideFactor; i++){
 
        let tempArray = copyArray.splice(0, arrayCount >= copyArray.length? copyArray.length : arrayCount);
        arrays.push(tempArray);
    }
    if(copyArray.length != 0){
        arrays.push([...copyArray]);
    }
    return arrays;
}

export function _generateCategory(): Category {
    const categoryNames = [
        'Web Development', 'Frontend', 'Backend', 'APIs', 'Frameworks',
        'Mobile Development', 'Security', 'Cloud Computing', 'Testing', 'Deployment', 'DevOps', 'Database Design'
    ];
    const name = categoryNames[Math.floor(Math.random() * categoryNames.length)];
    const type = Math.floor(Math.random() * 3) as CategoryType;
    return { name, type };
}

// Función para generar un objeto Post aleatorio
export function _generatePost(): Post {
    const titleWords = ['How to', 'The Benefits of', 'Top Tools for', 'A Beginner\'s Guide to', 'The Future of'];
    const titleNouns = ['Web Development', 'API Design', 'Database Management', 'Mobile App Development', 'Cloud Computing'];
    const title = `${titleWords[Math.floor(Math.random() * titleWords.length)]} ${titleNouns[Math.floor(Math.random() * titleNouns.length)]} ${Math.random().toString(36).substring(2, 7)}`;
    const categories = new Array(3).fill(null).map(_generateCategory);
    const date = new Date(Date.now() - Math.floor(Math.random() * 1000000000)); // Random date in the last month
    const summaryWords = ['In this article', 'Discover', 'Explore', 'Learn about', 'Find out about'];
    const summaryNouns = ['the latest trends', 'the best practices', 'the newest technologies', 'the most popular frameworks'];
    const summary = `${summaryWords[Math.floor(Math.random() * summaryWords.length)]} ${summaryNouns[Math.floor(Math.random() * summaryNouns.length)]} ${Math.random().toString(36).substring(2, 20)}`;
    return {slug: _slug(title), title, categories, date, summary };
}

export function _serializePosts(posts: Post[]): string{
        let postsCopy = posts.map(post => ({...post, date: post.date.toISOString()}));
        return JSON.stringify(postsCopy);
}

export function _deserializePosts(json: string): Post[]{
    let posts: Post[] = JSON.parse(json).map((jsonPost: Post & {date: string}) => ({...jsonPost, date: new Date(jsonPost.date)}))
    return posts;
}  

export function _formatDate(date: Date): string {
    const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date); 
    const month = new Intl.DateTimeFormat('en', {month: "long"}).format(date); 
    const day = new Intl.DateTimeFormat('en', {day: "2-digit"}).format(date); 
    return `${month} ${day}, ${year}`;
}

export function _getSearches(): Search[]{
    let searches: Search[] = jsonSearches.map(({slug, title,date}: { slug:string,title: string, date: string}) => {
        return {
            slug,
            title,
            date: new Date(date),
        }
    })
    return searches;
}