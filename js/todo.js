// Backbone.Model

var Blog = Backbone.Model.extend({
    // 如果不传的话使用的默认设置
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

//Backbone.Collection

var Blogs = Backbone.Collection.extend({

});

// instantiate two Blogs

var blog1 = new Blog({
    author: 'Spencer',
    title: 'Spencer\'s blog',
    url: 'http://www.spencer.com'
});

var blog2 = new Blog({
    author: 'Dianna',
    title: 'Dianna\'s blog',
    url: 'http://dianna.com'
});

// instantiate a Collection 传入两个实例到 blog 的集合

var blogs = new Blogs();

// Backbone.View for one blog 一条信息的视图

var BlogView = Backbone.View.extend({
    // 一条信息的数据内容就是一个 Blog 对象的实例
    model: new Blog(),
    // 指定 dom，不传的话就是一个默认空的 div，这里当然是基于模板的
    tagName: 'tr',
    // 初始化方法，这个方法在视图第一次 create 时候被调用，如果视图已经存在怎么办？ 详见文档
    initialize: function() {
        // 这里使用了 underscore 的模板方法
        this.template = _.template($('.blog-list-template').html());
    },
    render: function() {
        // 这里的 el 指的就是 tr，传入的是设好的模板，模板的参数就是 model.toJSON() 方法得到的 hash 列表 
        this.$el.html(this.template(this.model.toJSON()));
        // 防止链式调用 enable chained calls.
        return this;
    }
});

// Backbone.View for one blog 多条信息结合的视图

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function() {
        this.model.on('add', this.render, this);
    },
    events: {
        'click .edit-blog': 'edit',
        'update .update-blog': 'update',
        'delete .delete-blog': 'delete',
        'cancel .cancel': 'cancel'
    },
    edit: function() {
        $('.edit-blog').hide();
        $('.delete-blog').hide();
        $('.update-blog').show();
        $('.cancel').show();

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
        this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
        this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');
    },
    update: function() {
        var author = $('.author-update').val();
        var title = $('.title-update').val();
        var url = $('.url-update').val();
        this.model.set({ author: author, title: title, url: url });
        $('.edit-blog').show();
        $('.delete-blog').show();
        $('.update-blog').hide();
        $('.cancel').hide();
    },
    render: function() {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(blog) {
            // 该回调指向第一个参数，即 array 对象，所以需要使用保存原上下文
            self.$el.append((new BlogView({ model: blog })).render().$el);
        });
        return this;
    }
});

var blogsView = new BlogsView();

$(function() {
    $('.add-blog').on('click', function() {
        var author = $('.author-input').val();
        var title = $('.title-input').val();
        var url = $('.url-input').val();
        var blog = new Blog({
            author: author,
            title: title,
            url: url
        });
        $('.author-input').val('');
        $('.title-input').val('');
        $('.url-input').val('');
        console.log(blog.toJSON());
        blogs.add(blog);
    })
});