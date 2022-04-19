
import { useFeedQuery } from 'src/graphql'
import { MOCK_DATA } from 'src/mocks/data'
import { useAppSelector, useInfiniteQuery } from 'src/utils/hooks'
import PostsList from '../../Components/PostsList/PostsList'
import TrendingCard from '../../Components/TrendingCard/TrendingCard'
import AuthorCard from './Components/AuthorCard/AuthorCard'
import PostActions from './Components/PostActions/PostActions'
import styles from './styles.module.css'


export default function PostDetailsPage() {

    // const feedQuery = useFeedQuery({
    //     variables: {
    //         take: 10,
    //         skip: 0
    //     },
    // })
    // const { fetchMore, isFetchingMore } = useInfiniteQuery(feedQuery, 'getFeed')
    const post = MOCK_DATA.posts.stories[0]
    const { navHeight } = useAppSelector((state) => ({
        navHeight: state.ui.navHeight
    }));

    return (
        <div
            className={`page-container grid pt-16 w-full gap-32 ${styles.grid}`}
        >
            <aside className='no-scrollbar'>
                <div className="sticky"
                    style={{
                        top: `${navHeight + 16}px`,
                        maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        overflowY: "scroll",
                    }}>
                    <PostActions />
                </div>
            </aside>

            <p className='text-gray-700'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, tenetur sapiente magnam pariatur, optio, veniam debitis ab earum tempora repellendus vel? Sed quidem commodi deserunt dolore ex cupiditate ab obcaecati et nisi incidunt facilis repellat ea voluptatem molestiae, minima placeat dolorem expedita dolor quas esse. At mollitia perferendis nihil iste quisquam facilis fuga cupiditate vero, repellat eveniet ipsam, voluptatem ea in voluptatibus alias voluptates est soluta assumenda quam quaerat consequatur? Nobis aliquid atque facere, nostrum velit obcaecati earum eaque dolores et tempora repellendus ratione explicabo repellat, porro tempore unde totam molestiae quia voluptatum officia, ipsum dolorem non pariatur? Possimus esse voluptatem debitis, quod odit nobis optio reiciendis ullam repudiandae cum ratione animi sequi a? Soluta animi sit facere sint facilis incidunt aspernatur quia distinctio suscipit laboriosam magnam ex maxime, vel quas voluptate harum ut. Voluptatum quasi nemo itaque autem repellat possimus ab enim recusandae libero suscipit quas labore, saepe praesentium nesciunt pariatur velit cupiditate soluta! Possimus vel provident incidunt aperiam quaerat impedit consequatur nesciunt consectetur. Facere modi sequi itaque, tempore ea nemo similique aliquam harum, molestiae officia ullam animi repellat consequuntur odio. Provident tenetur voluptas error temporibus porro, sequi reiciendis fugiat id. Laboriosam minima aperiam error, commodi doloribus odit libero alias ipsa molestiae maiores non tempore dolorem veniam quod quo ex id, velit necessitatibus neque sed? Sit dicta maxime neque amet non architecto ab cum eaque provident. Aut, omnis veniam ex ut quod repellat. Minus eius magni ipsum ducimus, tempora nemo suscipit perspiciatis facilis vitae placeat impedit? Accusamus natus iusto nisi, repudiandae minus quibusdam hic? Vero magni tenetur ipsum voluptate suscipit eos, pariatur nulla labore corrupti atque repellat provident velit ab iusto perspiciatis error eum, earum facilis ut ea, quas quod magnam. Suscipit iusto in magni ratione doloribus corrupti, quis esse repellat odit fugiat minus at, pariatur aliquid voluptate id perspiciatis provident ad dolores accusantium similique ea. Quos numquam officiis ad rem repellendus. Tempora quae totam suscipit dolorem non aperiam repellat consectetur tenetur nemo harum asperiores deserunt veniam, laboriosam iusto quas molestiae modi! Fugiat ea recusandae libero provident veritatis modi vel dolor consectetur similique officiis quo veniam quos mollitia, cumque autem ex eius quis aliquam dignissimos vero. Deserunt, iure, ducimus ipsam minima dolor corporis blanditiis incidunt vitae velit saepe obcaecati accusamus libero, optio quidem atque totam doloremque natus harum alias consectetur odit. Ea, temporibus alias ex tempore, similique praesentium aliquam, inventore corrupti nulla repellat autem esse. Nisi at aperiam reprehenderit, maiores mollitia exercitationem provident ipsa odio sed nihil iste quo aspernatur vero architecto repudiandae! Tempora, doloribus cupiditate itaque eveniet corporis corrupti et molestias. Nulla consequatur neque pariatur laboriosam provident vero exercitationem eligendi numquam, corporis eius aliquam accusamus a minima cumque quia, molestias atque at, quidem aperiam! Aut ullam vel eligendi. Vitae nobis ad minus sed exercitationem? Expedita, laudantium ipsum nemo adipisci qui quam distinctio aliquid facere eligendi consequatur repellat, animi ex a assumenda dicta temporibus illo voluptatum aspernatur non architecto natus iste pariatur. Error fugit cumque impedit doloribus qui, iste laudantium voluptate aspernatur, quod voluptatibus corrupti, quidem nostrum. Aperiam fugit dicta error, molestias tempore officiis, repellat nisi nam adipisci optio in iusto totam. Tempore optio facilis blanditiis velit eum ut, asperiores et numquam, aperiam quidem veritatis aliquid! Cupiditate exercitationem quibusdam consequuntur optio nemo velit, at quo obcaecati voluptates repellat beatae rerum pariatur nostrum officiis culpa molestiae dolorum sapiente dignissimos facilis ullam quisquam consequatur, accusantium vitae? Temporibus odio similique aspernatur autem, culpa est ratione quaerat eum vel accusamus distinctio eius adipisci animi unde iure debitis eos doloremque officia optio aliquam consequuntur nihil ducimus consequatur. Blanditiis dolor, maiores dolore suscipit ipsam officia ad. Corporis et ratione voluptate ut tempora voluptatem, quisquam aspernatur animi labore aut eius modi beatae ipsam obcaecati numquam voluptatum reiciendis excepturi dignissimos at fugiat natus quidem ad necessitatibus. Expedita inventore dignissimos neque quis dolorum iure non veniam quia, voluptas sint itaque sed cum enim. Ut nesciunt delectus ipsam? Delectus sunt ab enim dolores natus? Libero animi assumenda sint cupiditate nulla id deserunt unde error praesentium omnis suscipit nisi veritatis laudantium aperiam, impedit alias temporibus velit eligendi incidunt? Impedit voluptatibus voluptates nostrum tempora tenetur magni totam quo hic ab quod non, minima, aliquam officia commodi temporibus nisi pariatur rerum voluptatum! Nobis, cumque voluptatibus quisquam tempora corrupti dolore perspiciatis quis culpa?
            </p>
            <aside className='no-scrollbar'>
                <div className="flex flex-col gap-24"
                    style={{
                        top: `${navHeight + 16}px`,
                        maxHeight: `calc(100vh - ${navHeight}px - 16px)`,
                        overflowY: "scroll",
                    }}>
                    <AuthorCard author={post.author} />
                    <TrendingCard />
                </div>
            </aside>
        </div>
    )
}
