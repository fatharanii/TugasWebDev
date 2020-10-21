$(document).ready(function(){
    $('.delete-berita').on('click', function(){
        var id = $(this).data('id');
        var url = '/delete/'+id;
        if(confirm('Remove News?')){
            $.ajax({
                url : url,
                type : 'DELETE',
                success : function(result){
                    console.log('Removing...');
                    window.location.href='/';
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    });

    $('.edit-berita').on('click', function(){
        $('#edit-form-judul').val($(this).data('judul'));
        $('#edit-form-konten').val($(this).data('konten'));
        $('#edit-form-kategori').val($(this).data('kategori'));
        $('#edit-form-id').val($(this).data('id'));
    })
});